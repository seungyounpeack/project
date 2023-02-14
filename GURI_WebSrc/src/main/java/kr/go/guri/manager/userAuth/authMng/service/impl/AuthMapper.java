package kr.go.guri.manager.userAuth.authMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;

/**
 * 관리자 > 권한 관리용 Mapper 클래스
 * @author 김부권
 * @since 2021. 08. 25.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.08.25.   	김부권          최초 생성
 *   
 * </pre>
 */
@Repository("authMapper")
public class AuthMapper extends ComAbstractDAO {

	/**
	 * 권한 목록 조회하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public List<Map<String, Object>> selectAuthList(Map<String, Object> param) throws IOException, SQLException {
		return selectList("AuthManageDAO.selectAuthList", param);
	}
	
	
	/**
	 * 권한 정보 저장하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public int insertAuthInfo(Map<String, Object> param) throws IOException, SQLException {
		
		return insert("AuthManageDAO.insertAuthInfo", param);
	}
	
	
	/**
	 * 권한 정보 수정하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public int updateAuthInfo(Map<String, Object> param) throws IOException, SQLException {
		
		return insert("AuthManageDAO.updateAuthInfo", param);
	}
	
	
	/**
	 * 권한 정보 삭제하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public int deleteAuthInfo(Map<String, Object> param) throws IOException, SQLException {
		
		return delete("AuthManageDAO.deleteAuthInfo", param);
	}
	
	
	/**
	 * 권한별 메뉴 정보 저장하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public int insertAuthMenuInfo(Map<String, Object> param) throws IOException, SQLException {
		
		return insert("AuthManageDAO.insertAuthMenuInfo", param);
	}

	
	/**
	 * 권한별 메뉴 정보 삭제하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public int deleteAuthMenuInfo(Map<String, Object> param) throws IOException, SQLException {
		
		return delete("AuthManageDAO.deleteAuthMenuInfo", param);
	}
	
	
	/**
	 * 권한 코드별 선택한 메뉴 목록 조회하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public List<Map<String, Object>> selectAuthMenuList(Map<String, Object> param) throws IOException, SQLException {
		return selectList("AuthManageDAO.selectAuthMenuList", param);
	}
	
	
}
