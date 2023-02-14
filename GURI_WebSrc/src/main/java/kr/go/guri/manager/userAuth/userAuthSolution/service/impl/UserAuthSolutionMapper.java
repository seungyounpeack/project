package kr.go.guri.manager.userAuth.userAuthSolution.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;

@Repository("userAuthSolutionMapper")
public class UserAuthSolutionMapper extends ComAbstractDAO  {
	
	/**
	 * 솔루션 권한 부여하기	
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public int selectInsertSolutionAuth(Map<String, Object> param) throws IOException, SQLException {
		return update("UserAuthSolutionManage.selectInsertSolutionAuth", param);
	}
	/**
	 * 솔루션 권한 해제하기	
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public int selectDeleteSolutionAuth(Map<String, Object> param) throws IOException, SQLException {
		return update("UserAuthSolutionManage.selectDeleteSolutionAuth", param);
	}
	/**
	 * 솔루션 사용자 목록 조회	
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectSolutionUserList(Map<String, Object> param) throws IOException, SQLException {
		return selectList("UserAuthSolutionManage.selectSolutionUserList", param);
	}
	/**
	 * 사용자 목록 조회	
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectUserList(Map<String, Object> param) throws IOException, SQLException {
		return selectList("UserAuthSolutionManage.selectUserList", param);
	}
	
	/**
	 * solution user권한 cnt 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public int selectSolutionUserCnt(Map<String, Object> param) throws IOException, SQLException {
		
		return selectOne("UserAuthSolutionManage.selectSolutionUserCnt", param);
	}
	
}
