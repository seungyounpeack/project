package kr.go.guri.manager.userAuth.userSearch.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;
/**
 * 관리자 사용자 조회 Controller 클래스
 * @author 김부권
 * @since 2022. 06. 21.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *     수정일                         수정자                            수정내용
 *  -----------       -------------   ----------------------
 *  2022.06.21.           김부권                          최초 생성
 *   
 * </pre>
 */
@Repository("userSearchMapper")
public class UserSearchMapper extends ComAbstractDAO  {
	
	/**
	 * 부서조회	
	 * @param param
	 * @return
	 * @throws SQLException , IOException
	 */
	public List<Map<String, Object>> selectSearchList(Map<String, Object> param) throws SQLException , IOException {
		return selectList("UserSearchManage.selectSearchList", param);
	}
	
	/**
	 * 로딩시 부서 목록 가져오기
	 * **/
	public List<Map<String, Object>> getDeptAllGetList() throws SQLException , IOException {
		return selectList("UserSearchManage.getDeptAllGetList");
	}
	
	/**
	 * 로딩시 직위 목록 가져오기
	 * **/
	public List<Map<String, Object>> getPositionList() throws SQLException , IOException {
		return selectList("UserSearchManage.getPositionList");
	}
}
