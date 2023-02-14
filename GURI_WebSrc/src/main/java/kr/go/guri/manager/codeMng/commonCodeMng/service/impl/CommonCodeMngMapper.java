package kr.go.guri.manager.codeMng.commonCodeMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;

/**
 * 관리자 > 공통코드 관리 Mapper 클래스
 * @author 김부권
 * @since 2022. 06. 15.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *       수정일			     수정자		               수정내용
 *  --------------    -------------   ----------------------
 *  2022. 06. 15.   	     김부권                        최초 생성
 *   
 * </pre>
 */
@Repository("commonCodeMngMapper")
public class CommonCodeMngMapper extends ComAbstractDAO {

	/**
	 * 상위 공통코드 목록 조회하기
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectTopCodeList() {
		return selectList("CommonCodeMng.selectTopCodeList");
	}
	
	
	/**
	 * 하위 공통코드 목록 조회하기
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectSubCodeList(Map<String, Object> param) {
		return selectList("CommonCodeMng.selectSubCodeList", param);
	}
	
	/**
	 * 상위 특정 공통코드의 서브 코드 개수
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectGroupCodeCnt(Map<String, Object> param) {
		return selectList("CommonCodeMng.selectGroupCodeCnt", param);
	}
	
	/**
	 * 상위 공통코드 다음 가져오기
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectNextTopCode() {
		return selectOne("CommonCodeMng.selectNextTopCode");
	}
	
	/**
	 * 공통코드 다음 순서 가져오기
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectCodeSqe(Map<String, Object> param) {
		return selectOne("CommonCodeMng.selectCodeSqe", param);
	}
	
	
	/**
	 * 상위 공통코드 정보 저장하기
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public int insertTopCodeInfo(Map<String, Object> param) throws SQLException , IOException{
		
		return insert("CommonCodeMng.insertTopCodeInfo", param);
	}
	
	/**
	 * 하위 공통코드 정보 저장하기
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public int insertSubCodeInfo(Map<String, Object> param) throws SQLException , IOException{
		
		return insert("CommonCodeMng.insertSubCodeInfo", param);
	}
	
	
	/**
	 * 상위 공통코드 정보 수정하기
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public int updateTopCodeInfo(Map<String, Object> param) throws SQLException , IOException{
		
		return insert("CommonCodeMng.updateTopCodeInfo", param);
	}
	
	/**
	 * 하위 공통코드 정보 수정하기
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public int updateSubCodeInfo(Map<String, Object> param) throws SQLException , IOException{
		
		return insert("CommonCodeMng.updateSubCodeInfo", param);
	}
	
	
	/**
	 * 상위 공통코드 정보 삭제하기
	 * @param param`
	 * @return
	 * @throws Exception
	 */
	public int deleteTopCodeInfo(Map<String, Object> param) throws SQLException , IOException{
		
		return delete("CommonCodeMng.deleteTopCodeInfo", param);
	}
	
	/**
	 * 하위 공통코드 정보 삭제하기
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public int deleteSubCodeInfo(Map<String, Object> param) throws SQLException , IOException{
		
		return delete("CommonCodeMng.deleteSubCodeInfo", param);
	}
	
}
